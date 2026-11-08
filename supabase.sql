-- Выполнить один раз в Supabase: SQL Editor -> New query -> Run
create table if not exists public.dash_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.dash_state enable row level security;
create policy "own select" on public.dash_state for select using (auth.uid() = user_id);
create policy "own insert" on public.dash_state for insert with check (auth.uid() = user_id);
create policy "own update" on public.dash_state for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own delete" on public.dash_state for delete using (auth.uid() = user_id);
