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

// Recipient List
$recipients = ["hr@sdahospital.com", "hrofficesdamcbang@gmail.com"];
$subject = "Action Required: New Booking Request - " . $data['bookingFor'];

// Helper variables
$fullName = htmlspecialchars($data['fullName']);
$idNo = htmlspecialchars($data['idNo']);
$email = htmlspecialchars($data['email']);
$venue = htmlspecialchars($data['bookingFor']);
$date = htmlspecialchars($data['date']);
$time = htmlspecialchars($data['time']);
$reason = htmlspecialchars($data['reason']);
$pax = htmlspecialchars($data['pax']);
$participants = isset($data['participants']) ? htmlspecialchars(implode(", ", $data['participants'])) : "-";
$equipment = htmlspecialchars($data['equipment']);
$servingFood = ($data['servingFood'] === "yes") ? "Yes" : "No";
$description = htmlspecialchars($data['description']);
$housekeeping = htmlspecialchars($data['housekeeping'] ?: '-');

$message = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 0; }
        .container { max-width: 650px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background-color: #263238; color: #ffffff; padding: 25px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .content { padding: 30px; color: #333333; line-height: 1.5; }
        .section-title { color: #d84315; font-size: 16px; font-weight: 700; text-transform: uppercase; border-bottom: 2px solid #eeeeee; padding-bottom: 8px; margin-top: 25px; margin-bottom: 15px; }
        .details-table { width: 100%; border-collapse: collapse; font-size: 14px; }
        .details-table td { padding: 8px 0; border-bottom: 1px solid #f5f5f5; vertical-align: top; }
        .details-table td.label { width: 35%; font-weight: 600; color: #546e7a; }
        .details-table td.value { color: #263238; font-weight: 500; }
        .action-box { background-color: #e3f2fd; border-left: 4px solid #2196f3; padding: 15px; margin-top: 30px; border-radius: 0 4px 4px 0; }
        .footer { background-color: #cfd8dc; padding: 15px; text-align: center; font-size: 12px; color: #455a64; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <img src='https://www.sdahospital.com/logo.png' alt='SDA Hospital Logo' style='max-width: 150px; margin-bottom: 10px;'>
            <h1>New Booking Request</h1>
        </div>
        <div class='content'>
            <p>A new facility booking request has been submitted via the website. Please review the details below.</p>

            <div class='section-title'>Requester Information</div>
            <table class='details-table'>
                <tr><td class='label'>Requester Name</td><td class='value'>$fullName</td></tr>
                <tr><td class='label'>Employee/Staff ID</td><td class='value'>$idNo</td></tr>
                <tr><td class='label'>Contact Email</td><td class='value'>$email</td></tr>
            </table>

            <div class='section-title'>Booking Particulars</div>
            <table class='details-table'>
                <tr><td class='label'>Facility Required</td><td class='value'>$venue</td></tr>
                <tr><td class='label'>Start Date</td><td class='value'>$date</td></tr>
                <tr><td class='label'>Time Duration</td><td class='value'>$time</td></tr>
                <tr><td class='label'>Purpose of Booking</td><td class='value'>$reason</td></tr>
                <tr><td class='label'>Attendee Count (Pax)</td><td class='value'>$pax</td></tr>
                <tr><td class='label'>Key Participants</td><td class='value'>$participants</td></tr>
            </table>

            <div class='section-title'>Logistics & Requirements</div>
            <table class='details-table'>
                <tr><td class='label'>Equipment Needed</td><td class='value'>$equipment</td></tr>
                <tr><td class='label'>Food Service?</td><td class='value'>$servingFood</td></tr>
                <tr><td class='label'>Housekeeping Notes</td><td class='value'>$housekeeping</td></tr>
            </table>

            <div class='section-title'>Description / Agenda</div>
            <p style='background-color: #fafafa; padding: 15px; border-radius: 4px; font-size: 14px;'>$description</p>

            <div class='action-box'>
                <strong>Action Required:</strong>
                <p style='margin: 5px 0 0;'>Please log in to the HR Administrator Dashboard to <b>Approve</b> or <b>Reject</b> this request.</p>
                <div style='margin-top: 15px;'>
                    <a href='http://sdahospital.com/hr-login' style='background-color: #2196f3; color: white; padding: 8px 15px; text-decoration: none; border-radius: 4px; font-size: 14px; font-weight: bold;'>Go to Dashboard</a>
                </div>
            </div>
        </div>
        <div class='footer'>
            <p>SDA Hospital Automated Booking System</p>
        </div>
    </div>
</body>
</html>
";

$smtp = new SimpleSMTP("mail.sdahospital.com", 587, "noreply@sdahospital.com", "noreply25#");

$successCount = 0;
foreach ($recipients as $to) {
    if ($smtp->send($to, $subject, $message, "SDA Booking System")) {
        $successCount++;
    }
}

if ($successCount > 0) {
    echo json_encode(["success" => true, "message" => "Notification emails sent ($successCount)"]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to send emails"]);
}
?>
