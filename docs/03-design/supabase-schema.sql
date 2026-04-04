-- Course platform schema
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor → New query)

-- user_notes: one note per user per resource
create table user_notes (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    subject_id text not null,
    resource_id text not null,
    content text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (user_id, subject_id, resource_id)
);

alter table user_notes enable row level security;

create policy "users manage own notes"
    on user_notes
    for all
    using (user_id = auth.uid())
    with check (user_id = auth.uid());

-- user_progress: one progress blob per user per subject
create table user_progress (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    subject_id text not null,
    progress_data jsonb not null default '{}',
    updated_at timestamptz not null default now(),
    unique (user_id, subject_id)
);

alter table user_progress enable row level security;

create policy "users read own progress"
    on user_progress
    for select
    using (user_id = auth.uid());

create policy "users insert own progress"
    on user_progress
    for insert
    with check (user_id = auth.uid());

create policy "users update own progress"
    on user_progress
    for update
    using (user_id = auth.uid());

-- user_feedback: append-only, learners cannot edit or delete
create table user_feedback (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    author_display_name text,
    subject_id text not null,
    module text,
    resource_id text,
    rating smallint not null check (rating in (1, -1)),
    comment text,
    created_at timestamptz not null default now()
);

alter table user_feedback enable row level security;

create policy "users read own feedback"
    on user_feedback
    for select
    using (user_id = auth.uid());

create policy "users insert own feedback"
    on user_feedback
    for insert
    with check (user_id = auth.uid());
