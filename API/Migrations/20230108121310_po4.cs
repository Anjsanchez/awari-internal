using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class po4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ReceivedById",
                table: "PurchaseOrderLines",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrderLines_ReceivedById",
                table: "PurchaseOrderLines",
                column: "ReceivedById");

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseOrderLines_Users_ReceivedById",
                table: "PurchaseOrderLines",
                column: "ReceivedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseOrderLines_Users_ReceivedById",
                table: "PurchaseOrderLines");

            migrationBuilder.DropIndex(
                name: "IX_PurchaseOrderLines_ReceivedById",
                table: "PurchaseOrderLines");

            migrationBuilder.DropColumn(
                name: "ReceivedById",
                table: "PurchaseOrderLines");
        }
    }
}
