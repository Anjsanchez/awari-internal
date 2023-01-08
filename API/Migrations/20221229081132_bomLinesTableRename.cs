using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class bomLinesTableRename : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LineBarcode",
                table: "BomLines",
                newName: "LineId");

            migrationBuilder.RenameColumn(
                name: "HeaderBarcode",
                table: "BomLines",
                newName: "HeaderId");

            migrationBuilder.AddColumn<Guid>(
                name: "Header_id",
                table: "BomLines",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_BomLines_Header_id",
                table: "BomLines",
                column: "Header_id");

            migrationBuilder.CreateIndex(
                name: "IX_BomLines_LineId",
                table: "BomLines",
                column: "LineId");

            migrationBuilder.AddForeignKey(
                name: "FK_BomLines_Products_Header_id",
                table: "BomLines",
                column: "Header_id",
                principalTable: "Products",
                principalColumn: "_id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BomLines_Products_LineId",
                table: "BomLines",
                column: "LineId",
                principalTable: "Products",
                principalColumn: "_id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BomLines_Products_Header_id",
                table: "BomLines");

            migrationBuilder.DropForeignKey(
                name: "FK_BomLines_Products_LineId",
                table: "BomLines");

            migrationBuilder.DropIndex(
                name: "IX_BomLines_Header_id",
                table: "BomLines");

            migrationBuilder.DropIndex(
                name: "IX_BomLines_LineId",
                table: "BomLines");

            migrationBuilder.DropColumn(
                name: "Header_id",
                table: "BomLines");

            migrationBuilder.RenameColumn(
                name: "LineId",
                table: "BomLines",
                newName: "LineBarcode");

            migrationBuilder.RenameColumn(
                name: "HeaderId",
                table: "BomLines",
                newName: "HeaderBarcode");
        }
    }
}
