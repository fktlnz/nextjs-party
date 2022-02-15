/** @jsxImportSource @emotion/react */
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Image from 'next/image';

// Styles
import * as style_utility from '../../styles/utility/utility'

type TableData = {
    id:number,
    question:string,
    select1_text:string,
    select1_imgpath:string,
    select2_text:string,
    select2_imgpath:string,
    select3_text:string,
    select3_imgpath:string,
    select4_text:string,
    select4_imgpath:string,
    answer:string
};

type TableDatas = {
    rows:TableData[],
    onChangeRadio:any,
    handleUploadPhoto:any
};

type PropsDisplayImg = {
    isRead: boolean,
    url: string
}

export default function BasicTable(props:TableDatas) {
    const DisplayImg:React.VFC<PropsDisplayImg>= (props) => {
        if(props.isRead) {
            return(
                <div css={style_utility.img_wrap}>
                    <Image src={props.url} layout="fill" objectFit="contain"></Image>
                </div>
            )
        }
        return (
            <></>
        )
    }
    
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow
          sx={{
              'th':{width:30}
          }}>
            <TableCell></TableCell>
            <TableCell>問題文</TableCell>
            <TableCell align="left">選択肢１</TableCell>
            <TableCell align="left">選択肢２</TableCell>
            <TableCell align="left">選択肢３</TableCell>
            <TableCell align="left">選択肢４</TableCell>
            <TableCell align="left">解答(1-4)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row:TableData, index) => (
            <TableRow
              key={row.id}
              sx={{
                  '&:last-child td, &:last-child th': { border: 0 }
              }}
              >
              <TableCell>
                  <label><input onChange={(e) => props.onChangeRadio(e)} type="radio" name="radio-name" value={index} /><span></span></label>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.question}
              </TableCell>
              <TableCell align="left">
                  <div>
                    <p css={(row.answer=="1") ? [style_utility.mb5, style_utility.color_danger] : style_utility.mb5}>{row.select1_text}</p>
                    <label css={(row.select1_imgpath!="") ? style_utility.display_none :style_utility.mb5} className="file-init-label" htmlFor={"file-read1-"+index}>画像...</label><input onChange={(e) => props.handleUploadPhoto(e, "0", index)} accept="image/png, image/jpeg" type="file" id={"file-read1-"+index} className="file-init"/>
                    <input css={(row.select1_imgpath!="") ? style_utility.display_none :""} type="text" className="file-init-name" disabled />
                  </div>
                  <DisplayImg isRead={(row.select1_imgpath!="")} url={row.select1_imgpath} />
              </TableCell>
              <TableCell align="left">
                  <div>
                    <p css={(row.answer=="2") ? [style_utility.mb5, style_utility.color_danger] : style_utility.mb5}>{row.select2_text}</p>
                    <label css={(row.select2_imgpath!="") ? style_utility.display_none :style_utility.mb5} className="file-init-label" htmlFor={"file-read2-"+index}>画像...</label><input onChange={(e) => props.handleUploadPhoto(e, "1", index)} accept="image/png, image/jpeg" type="file" id={"file-read2-"+index} className="file-init"/>
                    <input css={(row.select2_imgpath!="") ? style_utility.display_none :""} type="text" className="file-init-name" disabled />
                  </div>
                  <DisplayImg isRead={(row.select2_imgpath!="")} url={row.select2_imgpath} />
              </TableCell>
              <TableCell align="left">
                  <div>
                    <p css={(row.answer=="3") ? [style_utility.mb5, style_utility.color_danger] : style_utility.mb5}>{row.select3_text}</p>
                    <label css={(row.select3_imgpath!="") ? style_utility.display_none :style_utility.mb5} className="file-init-label" htmlFor={"file-read3-"+index}>画像...</label><input onChange={(e) => props.handleUploadPhoto(e, "2", index)} accept="image/png, image/jpeg" type="file" id={"file-read3-"+index} className="file-init"/>
                    <input css={(row.select3_imgpath!="") ? style_utility.display_none :""} type="text" className="file-init-name" disabled />
                  </div>
                  <DisplayImg isRead={(row.select3_imgpath!="")} url={row.select3_imgpath} />
              </TableCell>
              <TableCell align="left">
                  <div>
                    <p css={(row.answer=="4") ? [style_utility.mb5, style_utility.color_danger] : style_utility.mb5}>{row.select4_text}</p>
                    <label css={(row.select4_imgpath!="") ? style_utility.display_none :style_utility.mb5} className="file-init-label" htmlFor={"file-read4-"+index}>画像...</label><input onChange={(e) => props.handleUploadPhoto(e, "3", index)} accept="image/png, image/jpeg" type="file" id={"file-read4-"+index} className="file-init"/>
                    <input css={(row.select4_imgpath!="") ? style_utility.display_none :""} type="text" className="file-init-name" disabled />
                  </div>
                  <DisplayImg isRead={(row.select4_imgpath!="")} url={row.select4_imgpath} />
              </TableCell>
              <TableCell align="left">{row.answer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}