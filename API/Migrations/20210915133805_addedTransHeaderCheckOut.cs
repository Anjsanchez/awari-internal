using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addedTransHeaderCheckOut : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "checkOutBy",
                table: "TransHeader",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_TransHeader_checkOutBy",
                table: "TransHeader",
                column: "checkOutBy");

            migrationBuilder.AddForeignKey(
                name: "FK_TransHeader_Users_checkOutBy",
                table: "TransHeader",
                column: "checkOutBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TransHeader_Users_checkOutBy",
                table: "TransHeader");

            migrationBuilder.DropIndex(
                name: "IX_TransHeader_checkOutBy",
                table: "TransHeader");

            migrationBuilder.DropColumn(
                name: "checkOutBy",
                table: "TransHeader");
        }
    }
}
