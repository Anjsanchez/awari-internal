using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class changeTransRoom2Nullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TransRooms_Rooms_roomId",
                table: "TransRooms");

            migrationBuilder.AlterColumn<Guid>(
                name: "roomId",
                table: "TransRooms",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_TransRooms_Rooms_roomId",
                table: "TransRooms",
                column: "roomId",
                principalTable: "Rooms",
                principalColumn: "_id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TransRooms_Rooms_roomId",
                table: "TransRooms");

            migrationBuilder.AlterColumn<Guid>(
                name: "roomId",
                table: "TransRooms",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_TransRooms_Rooms_roomId",
                table: "TransRooms",
                column: "roomId",
                principalTable: "Rooms",
                principalColumn: "_id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
