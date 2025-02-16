import { NextResponse } from 'next/server';
import { GameResultService } from '@/services/gameResultService';

// CORS başlıkları
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const gameResultService = new GameResultService();

// GET handler
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '0');
    const size = parseInt(searchParams.get('size') || '10');

    const results = await gameResultService.getGameResults(page, size);

    return NextResponse.json(results, { 
      status: 200,
      headers: corsHeaders
    });
  } catch (error) {
    console.error('Error fetching game results:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST handler
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Gelen veriyi doğrula
    if (!gameResultService.validateGameResult(body)) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    await gameResultService.createGameResult(body);

    return NextResponse.json(
      { message: 'Result added successfully' },
      { 
        status: 201,
        headers: corsHeaders
      }
    );
  } catch (error) {
    console.error('Error creating game result:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// OPTIONS handler for CORS
export async function OPTIONS() {
  return NextResponse.json(
    {},
    { headers: corsHeaders }
  );
} 