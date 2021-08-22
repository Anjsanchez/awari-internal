using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class removedColumnsInLines : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservationRoomLines_RoomVariants_roomVariantId",
                table: "ReservationRoomLines");

            migrationBuilder.DropIndex(
                name: "IX_ReservationRoomLines_roomVariantId",
                table: "ReservationRoomLines");

            migrationBuilder.DropColumn(
                name: "roomVariantId",
                table: "ReservationRoomLines");

            migrationBuilder.RenameColumn(
                name: "extraPaxCount",
                table: "ReservationRoomLines",
                newName: "pax");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "pax",
                table: "ReservationRoomLines",
                newName: "extraPaxCount");

            migrationBuilder.AddColumn<Guid>(
                name: "roomVariantId",
                table: "ReservationRoomLines",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_ReservationRoomLines_roomVariantId",
                table: "ReservationRoomLines",
                column: "roomVariantId");

            migrationBuilder.AddForeignKey(
                name: "FK_ReservationRoomLines_RoomVariants_roomVariantId",
                table: "ReservationRoomLines",
                column: "roomVariantId",
                principalTable: "RoomVariants",
                principalColumn: "_id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
