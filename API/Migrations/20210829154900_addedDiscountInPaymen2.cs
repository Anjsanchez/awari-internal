using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addedDiscountInPaymen2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservationRoomLines_Discounts_discountId",
                table: "ReservationRoomLines");

            migrationBuilder.AlterColumn<Guid>(
                name: "discountId",
                table: "ReservationRoomLines",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_ReservationRoomLines_Discounts_discountId",
                table: "ReservationRoomLines",
                column: "discountId",
                principalTable: "Discounts",
                principalColumn: "_id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservationRoomLines_Discounts_discountId",
                table: "ReservationRoomLines");

            migrationBuilder.AlterColumn<Guid>(
                name: "discountId",
                table: "ReservationRoomLines",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ReservationRoomLines_Discounts_discountId",
                table: "ReservationRoomLines",
                column: "discountId",
                principalTable: "Discounts",
                principalColumn: "_id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
