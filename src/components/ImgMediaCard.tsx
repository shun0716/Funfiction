import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

interface ImgMediaCardIProps {
  width: number;
  height: string;
  left: number;
  right: number;
  bottom: number;
  image: string;
  title: string;
  creator: string;
  favorite: number;
}

const ModalCard: React.FC<ImgMediaCardIProps> = ({ ...props }) => {
  React.useEffect(() => {
    new (window as typeof globalThis).Image().src = props.image;
  }, [props.image]);

  const useStyles: () => Record<"root", string> = makeStyles({
    root: {
      width: props.width,
      marginLeft: props.left,
      marginRight: props.right,
      marginBottom: props.bottom
    }
  });
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="presentation"
          height={props.height}
          image={props.image}
          title="presentation"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.creator}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <i className="fas fa-star"></i> {props.favorite}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default ModalCard;
