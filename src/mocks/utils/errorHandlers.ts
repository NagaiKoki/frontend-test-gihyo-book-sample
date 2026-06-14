import { HttpResponse } from 'msw';

export const createUnauthorizedResponse = () => {
  return HttpResponse.json({ error: '認証が必要です' }, { status: 401 });
};

export const createForbiddenResponse = () => {
  return HttpResponse.json({ error: '権限がありません' }, { status: 403 });
};

export const createNotFoundResponse = (resource: string) => {
  return HttpResponse.json(
    { error: `${resource}が見つかりません` },
    { status: 404 },
  );
};

export const createServerErrorResponse = () => {
  return HttpResponse.json(
    { error: 'サーバーエラーが発生しました' },
    { status: 500 },
  );
};
