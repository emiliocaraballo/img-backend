import {MigrationInterface, QueryRunner,Table,TableForeignKey} from "typeorm";

export class init1643174315782 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {


        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    generationStrategy:'increment',
                    isGenerated:true
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "45"
                },
                {
                    name: "lastname",
                    type: "varchar",
                    length: "45"
                },
                {
                    name: "email",
                    type: "varchar",
                    length: "140"
                },
                {
                    name: "phone",
                    type: "varchar",
                    length: "15"
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }), true)

        await queryRunner.createTable(new Table({
            name: "technicals",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    generationStrategy:'increment',
                    isGenerated:true
                },
                {
                    name: "names",
                    type: "varchar",
                    length: "100"
                },
                {
                    name: "phone",
                    type: "varchar",
                    length: "15"
                },
                {
                    name: "email",
                    type: "varchar",
                    length: "140"
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }), true)


        await queryRunner.createTable(new Table({
            name: "services",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    generationStrategy:'increment',
                    isGenerated:true
                },
                {
                    name: "title",
                    type: "varchar",
                    length: "100"
                },
                {
                    name: "description",
                    type: "varchar",
                    length:"255"
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }), true)

        await queryRunner.createTable(new Table({
            name: "orders",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    generationStrategy:'increment',
                    isGenerated:true
                },
                {
                    name: "subject",
                    type: "text"
                },
                {
                    name: "user",
                    type: "int"
                },
                {
                    name: "service",
                    type: "int"
                },
                {
                    name: "technical",
                    type: "int"
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }), true)



        await queryRunner.createForeignKey("orders", new TableForeignKey({
            columnNames: ["user"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));


        await queryRunner.createForeignKey("orders", new TableForeignKey({
            columnNames: ["service"],
            referencedColumnNames: ["id"],
            referencedTableName: "services",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("orders", new TableForeignKey({
            columnNames: ["technical"],
            referencedColumnNames: ["id"],
            referencedTableName: "technicals",
            onDelete: "CASCADE"
        }));

        // await queryRunner.query(" SELECT setval('orders_id_seq', 1000, true);");
        // await queryRunner.query(" SELECT setval('services_id_seq', 1000, true);");
        // await queryRunner.query(" SELECT setval('technicals_id_seq', 1000, true);");
        // await queryRunner.query(" SELECT setval('users_id_seq', 1000, true);");


    }

    public async down(queryRunner: QueryRunner): Promise<any> {


        // const table = await queryRunner.getTable("orders");
        // const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("questionId") !== -1);
        // await queryRunner.dropForeignKey("answer", foreignKey);
        
        await queryRunner.dropTable("orders");
        await queryRunner.dropTable("services");
        await queryRunner.dropTable("technicals");
        await queryRunner.dropTable("users");
    }

}
