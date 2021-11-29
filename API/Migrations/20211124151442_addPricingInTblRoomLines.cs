using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addPricingInTblRoomLines : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "roomPricingId",
                table: "ReservationRoomLines",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ReservationRoomLines_roomPricingId",
                table: "ReservationRoomLines",
                column: "roomPricingId");

            migrationBuilder.AddForeignKey(
                name: "FK_ReservationRoomLines_RoomPricings_roomPricingId",
                table: "ReservationRoomLines",
                column: "roomPricingId",
                principalTable: "RoomPricings",
                principalColumn: "_id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservationRoomLines_RoomPricings_roomPricingId",
                table: "ReservationRoomLines");

            migrationBuilder.DropIndex(
                name: "IX_ReservationRoomLines_roomPricingId",
                table: "ReservationRoomLines");

            migrationBuilder.DropColumn(
                name: "roomPricingId",
                table: "ReservationRoomLines");
        }
    }
}
