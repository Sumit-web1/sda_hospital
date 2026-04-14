<?php
class SimpleSMTP {
    private $host;
    private $port;
    private $user;
    private $pass;
    private $debug = false;

    public function __construct($host, $port, $user, $pass) {
        $this->host = $host;
        $this->port = $port;
        $this->user = $user;
        $this->pass = $pass;
    }

    public function send($to, $subject, $body, $fromName = "SDA Hospital") {
        $socket = fsockopen($this->host, $this->port, $errno, $errstr, 30);
        if (!$socket) {
            return "Connection failed: $errstr ($errno)";
        }

        $this->read($socket); // banner

        $this->cmd($socket, "EHLO " . $this->host);
        $this->cmd($socket, "STARTTLS");
        stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
        $this->cmd($socket, "EHLO " . $this->host);

        $this->cmd($socket, "AUTH LOGIN");
        $this->cmd($socket, base64_encode($this->user));
        $this->cmd($socket, base64_encode($this->pass));

        $this->cmd($socket, "MAIL FROM: <" . $this->user . ">");
        $this->cmd($socket, "RCPT TO: <" . $to . ">");
        
        // Handle multiple recipients if $to has commas
        if (strpos($to, ',') !== false) {
             // Basic handling, loop would be better but keeping simple for now
             // For this specific use case, we usually send to single or handle in loop outside
        }

        $this->cmd($socket, "DATA");

        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $headers .= "From: $fromName <" . $this->user . ">\r\n";
        $headers .= "To: $to\r\n";
        $headers .= "Subject: $subject\r\n";

        $this->cmd($socket, "$headers\r\n$body\r\n.");
        
        $this->cmd($socket, "QUIT");
        fclose($socket);

        return true;
    }

    private function cmd($socket, $cmd) {
        fputs($socket, $cmd . "\r\n");
        return $this->read($socket);
    }

    private function read($socket) {
        $response = "";
        while ($str = fgets($socket, 515)) {
            $response .= $str;
            if (substr($str, 3, 1) == " ") break;
        }
        return $response;
    }
}
?>
