<?php

    $name = $_POST['name'];
    $mailFrom = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $mailTo = "shak.farooq2@gmail.com";
    $headers = "From: ".$mailFrom;
    $txt = "You have received an e-mail from ".$name.".\n\n".$message;

    $mail_sent = mail($mailTo, $subject, $txt, $headers);

    if ($mail_sent == true) { ?>
        <script language="javascript" type="text/javascript">
        alert('Thank you for the message. I will contact you shortly.');
        window.location = '../../index.html';
        </script>
    <?php } else { ?>
    <script language="javascript" type="text/javascript">
        alert('Message not sent. Please, notify the site administrator admin@admin.com');
        window.location = '../../index.html';
    </script>
    <?php
    }
?>