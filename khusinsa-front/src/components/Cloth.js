import React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

function Cloth() {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>브랜드</TableCell>
            <TableCell>상품명</TableCell>
            <TableCell>가격</TableCell>
            <TableCell>색상</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>인사일런스</TableCell>
            <TableCell>분트 롱코트</TableCell>
            <TableCell>210,000</TableCell>
            <TableCell>블랙</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}

export default Cloth;
