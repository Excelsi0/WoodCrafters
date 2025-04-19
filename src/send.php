<?php
// Проверяем наличие .env файла
$envFile = __DIR__ . '/.env';
if (file_exists($envFile)) {
    $env = parse_ini_file($envFile);
    $token = $env['TELEGRAM_TOKEN'] ?? '';
    $chat_id = $env['TELEGRAM_CHAT_ID'] ?? '';
} else {
    // Если .env файл отсутствует, используем значения по умолчанию
    // Эти значения должны быть установлены на хостинге
    $token = getenv('TELEGRAM_TOKEN') ?: '';
    $chat_id = getenv('TELEGRAM_CHAT_ID') ?: '';
}

// Проверяем наличие необходимых данных
if (empty($token) || empty($chat_id)) {
    die('Ошибка конфигурации: отсутствуют необходимые параметры');
}

// Получаем данные из формы
$name = !empty($_POST['name']) ? htmlspecialchars($_POST['name']) : 'Не указано';
$phone = !empty($_POST['phone']) ? htmlspecialchars($_POST['phone']) : 'Не указано';
$telegram = !empty($_POST['telegram']) ? htmlspecialchars($_POST['telegram']) : 'Не указано';
$message = !empty($_POST['message']) ? htmlspecialchars($_POST['message']) : 'Без комментария';

// Формируем текст сообщения
$txt = "<b>📥 Новая заявка с сайта:</b>%0A";
$txt .= "<b>👤 Имя:</b> $name%0A";
$txt .= "<b>📞 Телефон:</b> $phone%0A";
$txt .= "<b>💬 Telegram:</b> $telegram%0A";
$txt .= "<b>📝 Комментарий:</b> $message";

// Отправляем данные в Telegram
$url = "https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}";

// Используем cURL вместо file_get_contents
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Проверяем результат
if ($http_code == 200 && $response !== false) {
    // Успешная отправка
    ?>
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Спасибо!</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #1b1f24;
                margin: 0;
                padding: 0 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
            }
            .thank-you-container {
                background-color: #212a2e;
                padding: 40px;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
                text-align: center;
                max-width: 500px;
                width: 90%;
            }
            .thank-you-icon {
                font-size: 48px;
                margin-bottom: 20px;
            }
            h1 {
                color: #fff;
                margin-bottom: 20px;
            }
            p {
                color: #fff;
                line-height: 1.6;
            }
            .back-button {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px 20px;
                transition: all 0.2s linear;
                background-color: #15191c;
                border-radius: 10px;
                color: #fff;
                font-weight: 300;
                font-size: 28px;
                text-decoration: none;
            }
            .back-button:hover {
                transform: scale(1.01);
                box-shadow: 0 0 40px 25px #0000004d;
                text-shadow: 0 0 10px #eb9c48;
                background-color: #eb9c48;
            }
            .back-button:active {
                transform: scale(0.99);
                box-shadow: 0 0 20px 10px #0000004d;
            }
            @media (max-width: 768px) {
                .thank-you-icon {
                    font-size: 40px;
                    margin-bottom: 20px;
                }
                .back-button {
                    font-size: 20px;
                }
            }

        </style>
    </head>
    <body>
        <div class="thank-you-container">
            <div class="thank-you-icon"><img src="chek.svg" alt="check"></div>
            <h1>Спасибо за вашу заявку!</h1>
            <p>Мы получили ваше сообщение и свяжемся с вами в ближайшее время.</p>
            <a href="/" class="back-button">Вернуться на главную</a>
        </div>
    </body>
    </html>
    <?php
} else {
    // Ошибка при отправке
    ?>
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ошибка</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #1b1f24;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
            }
            .error-container {
                background-color: #212a2e;
                padding: 40px;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
                text-align: center;
                max-width: 500px;
                width: 90%;
            }
            .error-icon {
                font-size: 48px;
                margin-bottom: 20px;
                color: #dc3545;
            }
            h1 {
                color: #fff;
                margin-bottom: 20px;
            }
            p {
                color: #fff;
                line-height: 1.6;
            }
            .back-button {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px 20px;
                transition: all 0.2s linear;
                background-color: #212a2e;
                border-radius: 10px;
                color: #fff;
                font-weight: 300;
                font-size: 28px;
            }
            .back-button:hover {
                transform: scale(1.01);
                box-shadow: 0 0 40px 25px #0000004d;
                text-shadow: 0 0 10px #eb9c48;
                background-color: #eb9c48;
            }
            .back-button:active {
                transform: scale(0.99);
                box-shadow: 0 0 20px 10px #0000004d;
            }
            @media (max-width: 768px) {
                .thank-you-icon {
                    font-size: 40px;
                    margin-bottom: 20px;
                }
                .back-button {
                    font-size: 20px;
                }
            }

        </style>
    </head>
    <body>
        <div class="error-container">
            <div class="error-icon">❌</div>
            <h1>Произошла ошибка</h1>
            <p>При отправке формы произошла ошибка. Пожалуйста, попробуйте позже.</p>
            <a href="/" class="back-button">Вернуться на главную</a>
        </div>
    </body>
    </html>
    <?php
}
?>
