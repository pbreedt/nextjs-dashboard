// const cp = require('@/app/lib/db');
import connPool from '@/app/lib/db';
import {fetchFilteredInvoices} from '@/app/lib/data';

import { invoices, customers, revenue, users } from '../lib/placeholder-data';
import bcrypt from 'bcrypt';

async function seedUsers() {
  await connPool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  await connPool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    );
  `);

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      console.log(user.id, user.name, user.email, hashedPassword);
      return connPool.query(`
        INSERT INTO users (id, name, email, password)
        VALUES ('${user.id}', '${user.name}', '${user.email}', '${hashedPassword}')
        ON CONFLICT (id) DO NOTHING;
      `);
    }),
  );

  return insertedUsers;
}

async function seedInvoices() {
  await connPool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

  await connPool.query(`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `);

  const insertedInvoices = await Promise.all(
    invoices.map(
      (invoice) => connPool.query(`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES ('${invoice.customer_id}', ${invoice.amount}, '${invoice.status}', '${invoice.date}')
        ON CONFLICT (id) DO NOTHING;
      `),
    ),
  );

  return insertedInvoices;
}

async function seedCustomers() {
  await connPool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

  await connPool.query(`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `);

  const insertedCustomers = await Promise.all(
    customers.map(
      (customer) => connPool.query(`
        INSERT INTO customers (id, name, email, image_url)
        VALUES ('${customer.id}', '${customer.name}', '${customer.email}', '${customer.image_url}')
        ON CONFLICT (id) DO NOTHING;
      `),
    ),
  );

  return insertedCustomers;
}

async function seedRevenue() {
  await connPool.query(`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `);

  const insertedRevenue = await Promise.all(
    revenue.map(
      (rev) => connPool.query(`
        INSERT INTO revenue (month, revenue)
        VALUES ('${rev.month}', ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `),
    ),
  );

  return insertedRevenue;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
    // await cp.query`BEGIN`;


    await seedUsers();
    await seedCustomers();
    await seedInvoices();
    await seedRevenue();
    // await cp.query`COMMIT`;

    // let x = await fetchFilteredInvoices("Lee", 1);
    // console.log("DB result:",x);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    // await cp.query`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
