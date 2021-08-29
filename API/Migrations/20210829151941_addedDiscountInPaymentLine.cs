using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addedDiscountInPaymentLine : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "discountId",
                table: "ReservationRoomLines",
                type: "uniqueidentifier",
                nullable: true,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_ReservationRoomLines_discountId",
                table: "ReservationRoomLines",
                column: "discountId");

            migrationBuilder.AddForeignKey(
                name: "FK_ReservationRoomLines_Discounts_discountId",
                table: "ReservationRoomLines",
                column: "discountId",
                principalTable: "Discounts",
                principalColumn: "_id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservationRoomLines_Discounts_discountId",
                table: "ReservationRoomLines");

            migrationBuilder.DropIndex(
                name: "IX_ReservationRoomLines_discountId",
                table: "ReservationRoomLines");

            migrationBuilder.DropColumn(
                name: "discountId",
                table: "ReservationRoomLines");
        }
    }
}
