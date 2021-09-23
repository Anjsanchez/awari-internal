using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class changeTransRoomNullable1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservationTransLines_ReservationRoomLines_reservationRoomLineId",
                table: "ReservationTransLines");

            migrationBuilder.DropForeignKey(
                name: "FK_TransLines_TransRooms_transRoomId",
                table: "TransLines");

            migrationBuilder.AlterColumn<Guid>(
                name: "transRoomId",
                table: "TransLines",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "reservationRoomLineId",
                table: "ReservationTransLines",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_ReservationTransLines_ReservationRoomLines_reservationRoomLineId",
                table: "ReservationTransLines",
                column: "reservationRoomLineId",
                principalTable: "ReservationRoomLines",
                principalColumn: "_id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TransLines_TransRooms_transRoomId",
                table: "TransLines",
                column: "transRoomId",
                principalTable: "TransRooms",
                principalColumn: "_id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservationTransLines_ReservationRoomLines_reservationRoomLineId",
                table: "ReservationTransLines");

            migrationBuilder.DropForeignKey(
                name: "FK_TransLines_TransRooms_transRoomId",
                table: "TransLines");

            migrationBuilder.AlterColumn<Guid>(
                name: "transRoomId",
                table: "TransLines",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "reservationRoomLineId",
                table: "ReservationTransLines",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ReservationTransLines_ReservationRoomLines_reservationRoomLineId",
                table: "ReservationTransLines",
                column: "reservationRoomLineId",
                principalTable: "ReservationRoomLines",
                principalColumn: "_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TransLines_TransRooms_transRoomId",
                table: "TransLines",
                column: "transRoomId",
                principalTable: "TransRooms",
                principalColumn: "_id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
