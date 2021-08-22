using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addCustomerTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    _id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    customerid = table.Column<int>(type: "int", nullable: false),
                    firstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    lastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    mobile = table.Column<int>(type: "int", nullable: false),
                    birthday = table.Column<DateTime>(type: "datetime2", nullable: false),
                    points = table.Column<float>(type: "real", nullable: false),
                    isActive = table.Column<byte>(type: "tinyint", nullable: false),
                    cardAmount = table.Column<float>(type: "real", nullable: false),
                    createdDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    createdBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x._id);
                    table.ForeignKey(
                        name: "FK_Customers_Users_createdBy",
                        column: x => x.createdBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Customers_createdBy",
                table: "Customers",
                column: "createdBy");

            migrationBuilder.CreateIndex(
                name: "IX_Customers_customerid",
                table: "Customers",
                column: "customerid",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Customers");
        }
    }
}
