import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import db from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const emailFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (emailFound) {
      return NextResponse.json(
        { error: 'El email ya existe', user: emailFound },
        { status: 400 },
      );
    }

    const usernameFound = await db.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (usernameFound) {
      return NextResponse.json(
        { error: 'El nombre de usuario ya existe', user: usernameFound },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    // Crear usuario
    const newUser = await db.user.create({
      data: {
        username: data.username, // Cambiado de name a username
        email: data.email,
        password: hashedPassword, // Cambiado de password a hashedPassword
        email_verified_at: null, // Inicialmente null
        remember_token: null, // Inicialmente null
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_module_boss: false, // Esto se manejará en el middleware
      },
    });

    // Extraer la contraseña del usuario
    const { password: _, ...user } = newUser;

    return NextResponse.json(
      { message: 'Usuario creado con éxito', newUser: user },
      { status: 200 },
    );
  } catch (error) {
    // Error procesando la solicitud
    console.error('Error procesando la solicitud:', error);
    return NextResponse.json(
      {
        error: 'Error procesando la solicitud',
        details: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
