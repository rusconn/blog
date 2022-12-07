import { previewData } from "next/headers";

export const isPreview = () => !!previewData();
