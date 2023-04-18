const { v4: uuidv4 } = require("uuid");

exports.up = async (pgm) => {
  await pgm.sql(`
    CREATE TABLE public.categories (
      id UUID NOT NULL,
      name VARCHAR(150) NOT NULL,
      user_id UUID NULL
    );

     INSERT INTO public.categories (id, name)
    VALUES
      ('${uuidv4()}', 'health'),
      ('${uuidv4()}', 'transportation'),
      ('${uuidv4()}', 'fitness'),
      ('${uuidv4()}', 'groceries'),
      ('${uuidv4()}', 'payment'),
      ('${uuidv4()}', 'restaurants'),
      ('${uuidv4()}', 'bills'),
      ('${uuidv4()}', 'clothing'),
      ('${uuidv4()}', 'entertainment'),
      ('${uuidv4()}', 'travel'),
      ('${uuidv4()}', 'home'),
      ('${uuidv4()}', 'other');

    ALTER TABLE public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);

    CREATE TABLE public.ledgers (
      id UUID NOT NULL,
      user_id UUID NOT NULL,
      category_id UUID NOT NULL,
      trans_type VARCHAR(3) NOT NULL,
      amount NUMERIC NOT NULL,
      note VARCHAR(255) NULL,
      created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
      name VARCHAR(155) NOT NULL
    );

    ALTER TABLE public.ledgers
    ADD CONSTRAINT ledgers_pkey PRIMARY KEY (id);

    CREATE TABLE public.users (
      id UUID NOT NULL,
      name VARCHAR(70) NOT NULL,
      email VARCHAR(120) NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(10) NOT NULL DEFAULT 'user',
      confirmed BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMP WITHOUT TIME ZONE NULL DEFAULT now()
    );

    ALTER TABLE public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
  `);
};

exports.down = async (pgm) => {
  await pgm.sql(`
    DROP TABLE public.categories;
    DROP TABLE public.ledgers;
    DROP TABLE public.users;
  `);
};
