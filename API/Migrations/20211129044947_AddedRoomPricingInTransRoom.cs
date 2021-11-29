using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class AddedRoomPricingInTransRoom : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "roomPricingId",
                table: "TransRooms",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TransRooms_roomPricingId",
                table: "TransRooms",
                column: "roomPricingId");

            migrationBuilder.AddForeignKey(
                name: "FK_TransRooms_RoomPricings_roomPricingId",
                table: "TransRooms",
                column: "roomPricingId",
                principalTable: "RoomPricings",
                principalColumn: "_id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TransRooms_RoomPricings_roomPricingId",
                table: "TransRooms");

            migrationBuilder.DropIndex(
                name: "IX_TransRooms_roomPricingId",
                table: "TransRooms");

            migrationBuilder.DropColumn(
                name: "roomPricingId",
                table: "TransRooms");
        }
    }
}
