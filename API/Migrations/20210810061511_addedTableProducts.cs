using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addedTableProducts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    _id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    shortName = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    longName = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    numberOfServing = table.Column<int>(type: "int", nullable: false),
                    costPrice = table.Column<float>(type: "real", nullable: false),
                    sellingPrice = table.Column<float>(type: "real", nullable: false),
                    isActive = table.Column<bool>(type: "bit", nullable: false),
                    createdBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    createdDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x._id);
                    table.ForeignKey(
                        name: "FK_Products_Users_createdBy",
                        column: x => x.createdBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_createdBy",
                table: "Products",
                column: "createdBy");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
