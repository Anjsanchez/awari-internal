using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class AddedActiveProductTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "createdBy",
                table: "ProductTypes",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("29b57807-0bae-4149-9a6e-c7e369fa4dfe"));

            migrationBuilder.AddColumn<DateTime>(
                name: "createdDate",
                table: "ProductTypes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "isActive",
                table: "ProductTypes",
                type: "bit",
                nullable: false,
                defaultValue: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProductTypes_createdBy",
                table: "ProductTypes",
                column: "createdBy");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductTypes_Users_createdBy",
                table: "ProductTypes",
                column: "createdBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductTypes_Users_createdBy",
                table: "ProductTypes");

            migrationBuilder.DropIndex(
                name: "IX_ProductTypes_createdBy",
                table: "ProductTypes");

            migrationBuilder.DropColumn(
                name: "createdBy",
                table: "ProductTypes");

            migrationBuilder.DropColumn(
                name: "createdDate",
                table: "ProductTypes");

            migrationBuilder.DropColumn(
                name: "isActive",
                table: "ProductTypes");
        }
    }
}
