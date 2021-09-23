using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class changeRoomIdNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservationRoomLines_Rooms_roomId",
                table: "ReservationRoomLines");

            migrationBuilder.AlterColumn<Guid>(
                name: "roomId",
                table: "ReservationRoomLines",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_ReservationRoomLines_Rooms_roomId",
                table: "ReservationRoomLines",
                column: "roomId",
                principalTable: "Rooms",
                principalColumn: "_id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservationRoomLines_Rooms_roomId",
                table: "ReservationRoomLines");

            migrationBuilder.AlterColumn<Guid>(
                name: "roomId",
                table: "ReservationRoomLines",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ReservationRoomLines_Rooms_roomId",
                table: "ReservationRoomLines",
                column: "roomId",
                principalTable: "Rooms",
                principalColumn: "_id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
