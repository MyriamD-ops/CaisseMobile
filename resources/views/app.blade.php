<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Caisse Mobile') }} - Admin Dashboard</title>
    
    @vite(['resources/css/app.css', 'resources/js/main.jsx'])
</head>
<body class="antialiased">
    <div id="app"></div>
</body>
</html>
