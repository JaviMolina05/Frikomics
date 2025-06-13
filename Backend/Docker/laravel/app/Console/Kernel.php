<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Los comandos personalizados registrados.
     */
    protected $commands = [
        \App\Console\Commands\ImportMarvelComics::class,
        \App\Console\Commands\CloseExpiredAuctions::class,
    ];


    /**
     * Define el cron para los comandos.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->command('auctions:close-expired')->everyMinute();
    }

    /**
     * Registra los comandos para la consola.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');
        require base_path('routes/console.php');
    }
}
