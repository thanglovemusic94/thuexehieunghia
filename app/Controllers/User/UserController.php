<?php

namespace App\Controllers\User;
use App\Controllers\BaseController;
class UserController extends BaseController
{
    public function index(): string
    {
        return view('user/index');
    }
}
