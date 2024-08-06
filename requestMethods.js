import axios from 'axios';

const BASE_URL = "https://ai-shoes.onrender.com/api/";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWJmZGUzZmY5ZWVjNWIwNTg5MTY4ZiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MTMxMTExNjgsImV4cCI6MTcxMzcxNTk2OH0.A4xsGAcNJAOoR-mfUSxnSQtgEtDWqEXrV-e8118ypos";

export const publicRequest = axios.create({
   baseURL:BASE_URL,
});

export const userRequest = axios.create({
  baseURL:BASE_URL,
  header:{token:`Bearer ${TOKEN}`}
});