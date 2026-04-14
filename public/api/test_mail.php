<?php
// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-Type: text/plain");

require_once 'SimpleSMTP.php';

echo "--- Starting SMTP Email Test ---\n";

// 1. configuration
$to = "info@sdahospital.com"; 
$subject = "Test SMTP Email from Website";
$message = "This is a test email sent using SimpleSMTP class via mail.sdahospital.com:587.";

echo "To: $to\n";
echo "Subject: $subject\n";
echo "Using Host: mail.sdahospital.com\n";

// 2. Try sending
echo "Attempting to connect and send...\n";

$smtp = new SimpleSMTP("mail.sdahospital.com", 587, "noreply@sdahospital.com", "noreply25#");
$result = $smtp->send($to, $subject, $message, "SDA Tester");

if ($result === true) {
    echo "SUCCESS: Email sent successfully via SMTP.\n";
    echo "Check your inbox for $to.\n";
} else {
    echo "FAILURE: SMTP Send Failed.\n";
    echo "Error: " . $result . "\n";
}

echo "--- End Test ---\n";
?>
