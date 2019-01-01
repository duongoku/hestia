import React from "react";
import ReactDOM from "react-dom";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@material-ui/core";

class Sorting extends React.Component {
  /*
  -Sẽ sửa thành getDerivedStates... sau
  -Phần này là để tìm tọa độ của mỗi team
  */
  componentWillReceiveProps() {
    this.props.Teams.map(Team => {
      let ref = this.refs[Team.ref];
      //Tìm theo key riêng của mỗi team
      //(Là tên team đó, + 1 cái mã nào đó -> trùng thế đéo nào được)
      let Node = ReactDOM.findDOMNode(ref);
      //Tìm tọa độ
      let Bounding_Box = Node.getBoundingClientRect();
      this.setState({ [Team.key]: Bounding_Box });
    });
  }

  componentDidUpdate(PreviousProps) {
    /*
        For testing purposes
    */
    // let Key = parseInt(Math.random() * 3);
    // let key_ref = Team[Key].ref;
    PreviousProps.Teams.map((Team, index) => {
      let ref = this.refs[Team.ref];
      let node = ReactDOM.findDOMNode(ref);
      //Tìm xem với rank mới thì cháu bé nằm ở tọa độ nào
      let New_Bounding_Box = node.getBoundingClientRect();
      let Old_Bounding_Box = this.state[Team.key];
      let delta = Old_Bounding_Box.top - New_Bounding_Box.top;

      if (delta) {
        requestAnimationFrame(() => {
          node.style.transform = `translate3d(0, ${delta}px, 0)`;
          node.style.transition = `transform 0s`;

          requestAnimationFrame(() => {
            /*
            Xuống rank: 
            - không update gì cả, các thằng phía dưới nó sẽ đẩy nó xuống 
            */
            if (delta < 0) {
              setTimeout(() => {
                node.style.transform = ``;
                node.style.transition = `transform 500ms`;
              }, 1500);
            } else {
            /*
              Lên rank:
              -Nếu người vừa submit lên rank -> Cho cái khung màu xanh để cho đội đó vui
              -Nếu người đó submit xong xuống rank -> các đội khác dưới nó lên -> Không cho bất cứ màu gì hết, để nó xuống trong thầm lặng
                +Các đội trước khi submit ở dưới rank đội này và sau khi submit thì trên rank đội này sẽ không có màu mè gì
            */
              if (index == parseInt(Math.random() * 5))
                node.style.backgroundColor = "Green";
              else node.style.backgroundColor = "#FFFFFF";
              /*
              di chuyển trên bảng
              */
              node.style.transform = `translate3d(0, ${delta}px, 10px)`;
              //Chỉnh cả backgroundCOlor nên để transition all
              node.style.transition = `all 500ms`;

              setTimeout(() => {
                node.style.transform = `perspective(1000px) translate3d(0,0,10px)`;
                node.style.transtion = `transform 500ms`;
              }, 1500);
              setTimeout(() => {
                node.style.transform = `translate3d(0,0,0)`;
                node.style.backgroundColor = "#FFFFFF";
                node.style.transition = `all 1500ms`;
              }, 2500);
            }
          });
        });
      }
    });
  }

  onBoardClick(fromIndex) {
    this.props.onBoardClick(fromIndex);
  }

  render() {
    let data_Table = this.props.Teams.map((Team, index) => {
      // if()
      // console.log(index);
      return (
        /*
        Mỗi khi ấn vào một row (Có thay đổi trong data) thì sẽ gọi đến handleChange bên ./index.js để tạo lại bảng
        <TableCell>... là để in ra
        */
        <TableRow
          key={Team.key}
          ref={Team.ref}
          onClick={() => {
            this.onBoardClick(index);
          }}
        >
          {this.props.columns.map(CellData => {
            return <TableCell>{Team[CellData.accessor]}</TableCell>;
          })}
        </TableRow>
      );
    });
    return <TableBody>{data_Table}</TableBody>;
  }
}

export default Sorting;
