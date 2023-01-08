using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class po1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "InvoiceNumber",
                table: "PurchaseOrders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReceivedByDate",
                table: "PurchaseOrders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "ReceivedById",
                table: "PurchaseOrders",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrders_ReceivedById",
                table: "PurchaseOrders",
                column: "ReceivedById");

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseOrders_Users_ReceivedById",
                table: "PurchaseOrders",
                column: "ReceivedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseOrders_Users_ReceivedById",
                table: "PurchaseOrders");

            migrationBuilder.DropIndex(
                name: "IX_PurchaseOrders_ReceivedById",
                table: "PurchaseOrders");

            migrationBuilder.DropColumn(
                name: "InvoiceNumber",
                table: "PurchaseOrders");

            migrationBuilder.DropColumn(
                name: "ReceivedByDate",
                table: "PurchaseOrders");

            migrationBuilder.DropColumn(
                name: "ReceivedById",
                table: "PurchaseOrders");
        }
    }
}
