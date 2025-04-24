<?php

function validatePhoneNumber($phone) {
    // Проверяем тип данных
    if (!is_string($phone)) {
        return false;
    }

    // Максимальная длина исходной строки
    if (strlen($phone) > 25) {
        return false;
    }

    // Удаляем все кроме цифр
    $phone = preg_replace('/[^0-9]/', '', $phone);

    // Проверяем длину (10 или 11 цифр)
    if (strlen($phone) < 10 || strlen($phone) > 11) {
        return false;
    }

    // Если номер из 11 цифр
    if (strlen($phone) == 11) {
        // Проверяем первую цифру (должна быть 7 или 8)
        if (!in_array($phone[0], ['7', '8'])) {
            return false;
        }
    }

    // Проверяем код оператора (действительные коды)
    $operatorCode = strlen($phone) == 11 ? substr($phone, 1, 3) : substr($phone, 0, 3);
    $validOperatorCodes = [
        '900', '901', '902', '903', '904', '905', '906', '907', '908', '909', // Beeline
        '910', '911', '912', '913', '914', '915', '916', '917', '918', '919', // МТС
        '920', '921', '922', '923', '924', '925', '926', '927', '928', '929', // Мегафон
        '930', '931', '932', '933', '934', '935', '936', '937', '938', '939', // Теле2
        '958', '959', // Теле2
        '999', // Yota
    ];

    if (!in_array($operatorCode, $validOperatorCodes)) {
        return false;
    }

    return true;
}

function formatPhoneNumber($phone) {
    // Проверяем валидность
    if (!validatePhoneNumber($phone)) {
        return false;
    }

    // Удаляем все кроме цифр
    $phone = preg_replace('/[^0-9]/', '', $phone);

    // Если номер начинается с 8, заменяем на 7
    if (strlen($phone) == 11 && $phone[0] == '8') {
        $phone = '7' . substr($phone, 1);
    }

    // Если номер из 10 цифр, добавляем 7 в начало
    if (strlen($phone) == 10) {
        $phone = '7' . $phone;
    }

    // Форматируем номер в красивый вид
    return '+' . $phone[0] . ' (' . substr($phone, 1, 3) . ') ' .
           substr($phone, 4, 3) . '-' . substr($phone, 7, 2) . '-' .
           substr($phone, 9, 2);
}

?>
