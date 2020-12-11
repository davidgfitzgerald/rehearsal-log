async function tableExists (table_name, db) {
  const tables = await db.tables()
  await expect(tables).toContain(table_name)
}

export { tableExists }