import ImageKit from "imagekit";
import config from "@/lib/config";
import { NextResponse } from "next/server";

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndPoint }
  }
} = config;

const imagekit = new ImageKit({
  publicKey:publicKey,
  privateKey:privateKey,
  urlEndpoint:"https://ik.imagekit.io/tragicfate101"
});

export async function GET(request) {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}