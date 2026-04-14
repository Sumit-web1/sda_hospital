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

$to = $data['email'];
$subject = "Booking Confirmed: " . $data['bookingFor'] . " - SDA Hospital";

// Helper variables
$fullName = htmlspecialchars($data['fullName']);
$venue = htmlspecialchars($data['bookingFor']);
$date = htmlspecialchars($data['date']);
$time = htmlspecialchars($data['time']);
$reason = htmlspecialchars($data['reason'] ?: 'N/A');
$pax = htmlspecialchars($data['pax'] ?: 'N/A');

$message = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background-color: #004d40; color: #ffffff; padding: 25px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
        .content { padding: 30px; color: #333333; line-height: 1.6; }
        .content h2 { color: #004d40; margin-top: 0; font-size: 20px; }
        .status-badge { display: inline-block; background-color: #e8f5e9; color: #2e7d32; padding: 6px 12px; border-radius: 4px; font-weight: bold; font-size: 14px; margin-bottom: 20px; border: 1px solid #c8e6c9; }
        .details-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        .details-table td { padding: 12px 0; border-bottom: 1px solid #eeeeee; vertical-align: top; }
        .details-table td.label { width: 35%; font-weight: 600; color: #555555; }
        .details-table td.value { color: #000000; font-weight: 500; }
        .footer { background-color: #eee; padding: 20px; text-align: center; font-size: 12px; color: #777777; }
        .footer a { color: #004d40; text-decoration: none; }
        .btn { display: inline-block; background-color: #004d40; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px; font-weight: 600; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <img src='https://www.sdahospital.com/logo.png' alt='SDA Hospital Logo' style='max-width: 150px; margin-bottom: 10px;'>
            <h1>SDA Hospital Booking</h1>
        </div>
        <div class='content'>
            <h2>Booking Confirmation</h2>
            <p>Dear <strong>$fullName</strong>,</p>
            <p>We are pleased to inform you that your booking request has been successfully <strong>APPROVED</strong>.</p>
            
            <div style='text-align: center;'>
                <span class='status-badge'>✅ BOOKING CONFIRMED</span>
            </div>

            <table class='details-table'>
                <tr><td class='label'>Venue</td><td class='value'>$venue</td></tr>
                <tr><td class='label'>Event Date</td><td class='value'>$date</td></tr>
                <tr><td class='label'>Time Slot</td><td class='value'>$time</td></tr>
                <tr><td class='label'>Purpose/Reason</td><td class='value'>$reason</td></tr>
                <tr><td class='label'>Expected Guests</td><td class='value'>$pax</td></tr>
            </table>

            <p>Please ensure you arrive 15 minutes prior to the scheduled time. If you have any housekeeping or equipment requirements discussed, they have been noted by our team.</p>

            <p style='margin-top: 30px;'>For any changes or cancellations, please contact the administration office immediately.</p>
        </div>
        <div class='footer'>
            <p>Seventh Day Adventist Medical Centre<br/>
            Frazer Town, Bengaluru, Karnataka – 560005</p>
            <p>Need help? Contact <a href='mailto:info@sdahospital.com'>info@sdahospital.com</a></p>
        </div>
    </div>
</body>
</html>
";

$smtp = new SimpleSMTP("mail.sdahospital.com", 587, "noreply@sdahospital.com", "noreply25#");
$result = $smtp->send($to, $subject, $message, "SDA Hospital Admin");

if ($result === true) {
    echo json_encode(["success" => true, "message" => "Approval email sent via SMTP"]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to send: " . $result]);
}
?>
