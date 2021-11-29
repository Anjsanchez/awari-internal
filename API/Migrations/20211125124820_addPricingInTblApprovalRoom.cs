using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addPricingInTblApprovalRoom : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "roomPricingId",
                table: "ApprovalRooms",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalRooms_roomPricingId",
                table: "ApprovalRooms",
                column: "roomPricingId");

            migrationBuilder.AddForeignKey(
                name: "FK_ApprovalRooms_RoomPricings_roomPricingId",
                table: "ApprovalRooms",
                column: "roomPricingId",
                principalTable: "RoomPricings",
                principalColumn: "_id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApprovalRooms_RoomPricings_roomPricingId",
                table: "ApprovalRooms");

            migrationBuilder.DropIndex(
                name: "IX_ApprovalRooms_roomPricingId",
                table: "ApprovalRooms");

            migrationBuilder.DropColumn(
                name: "roomPricingId",
                table: "ApprovalRooms");
        }
    }
}
