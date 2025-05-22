export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  birthDate: string; // formato ISO: 'YYYY-MM-DD'
}

export interface LoginResponse {
  message: string;
  userId: number;
  token?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}


