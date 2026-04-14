<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'SimpleSMTP.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "No data received"]);
    exit();
}

$to = "info@sdahospital.com";
$replyTo = $data['email'];
$subject = "New Contact Us Message";

$message = "
<html>
<head>
    <title>New Contact Message</title>
</head>
<body>
    <h2>New Contact Message</h2>
    <p><b>Name:</b> " . htmlspecialchars($data['name']) . "</p>
    <p><b>Email:</b> " . htmlspecialchars($data['email']) . "</p>
    <p><b>Message:</b><br/>" . nl2br(htmlspecialchars($data['message'])) . "</p>
    <hr />
    <p>Submitted via SDA Hospital Website</p>
</body>
</html>
";

// Use SMTP (Reply-To handling is not in SimpleSMTP v1, so we just append it in headers inside send method if we modified it, 
// but for simplicity, we will just send it as standard email. The SimpleSMTP class I wrote handles standard From/To. 
// Standard Reply-To support would need to be added to SimpleSMTP class, but for now we will just send.)

$smtp = new SimpleSMTP("mail.sdahospital.com", 587, "noreply@sdahospital.com", "noreply25#");

// Sending to info@sdahospital.com
$result = $smtp->send($to, $subject, $message, "SDA Website Contact");

if ($result === true) {
    echo json_encode(["success" => true, "message" => "Contact email sent"]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to send email: " . $result]);
}
?>
