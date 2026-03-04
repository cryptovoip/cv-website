<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data) {
        $data = $_POST;
    }

    $firstName = strip_tags(trim($data["firstName"]));
    $lastName = strip_tags(trim($data["lastName"]));
    $email = filter_var(trim($data["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($data["message"]);

    if (empty($firstName) || empty($lastName) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["error" => "Please fill all the required fields correctly."]);
        exit;
    }

    $recipient = "contact@cryptovoip.in";
    $subject = "New Website Contact from: $firstName $lastName";
    
    $email_content = "Name: $firstName $lastName\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    $email_headers = "From: $firstName $lastName <$email>\r\n";
    $email_headers .= "Reply-To: $email\r\n";

    if (mail($recipient, $subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo json_encode(["success" => "Thank You! Your message has been sent."]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Oops! Something went wrong, and we couldn't send your message."]);
    }
} else {
    http_response_code(403);
    echo json_encode(["error" => "There was a problem with your submission, please try again."]);
}
?>
