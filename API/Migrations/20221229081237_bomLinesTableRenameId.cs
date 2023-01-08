using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class bomLinesTableRenameId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BomLines_Products_Header_id",
                table: "BomLines");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BomLines",
                table: "BomLines");

            migrationBuilder.DropIndex(
                name: "IX_BomLines_Header_id",
                table: "BomLines");

            migrationBuilder.DropColumn(
                name: "Header_id",
                table: "BomLines");

            migrationBuilder.AddColumn<Guid>(
                name: "_id",
                table: "BomLines",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_BomLines",
                table: "BomLines",
                column: "_id");

            migrationBuilder.CreateIndex(
                name: "IX_BomLines_HeaderId",
                table: "BomLines",
                column: "HeaderId");

            migrationBuilder.AddForeignKey(
                name: "FK_BomLines_Products_HeaderId",
                table: "BomLines",
                column: "HeaderId",
                principalTable: "Products",
                principalColumn: "_id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BomLines_Products_HeaderId",
                table: "BomLines");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BomLines",
                table: "BomLines");

            migrationBuilder.DropIndex(
                name: "IX_BomLines_HeaderId",
                table: "BomLines");

            migrationBuilder.DropColumn(
                name: "_id",
                table: "BomLines");

            migrationBuilder.AddColumn<Guid>(
                name: "Header_id",
                table: "BomLines",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_BomLines",
                table: "BomLines",
                column: "HeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_BomLines_Header_id",
                table: "BomLines",
                column: "Header_id");

            migrationBuilder.AddForeignKey(
                name: "FK_BomLines_Products_Header_id",
                table: "BomLines",
                column: "Header_id",
                principalTable: "Products",
                principalColumn: "_id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
