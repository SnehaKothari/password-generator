import PropTypes from "prop-types";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import "../styles/PasswordGenerator.css";

const PasswordList = ({ passwords }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Last 5 Passwords:
      </Typography>
      <List className="password-listall">
        {passwords.map((password, index) => (
          <ListItem key={index}>
            <ListItemText primary={password} className="password-list-name" />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

PasswordList.propTypes = {
  passwords: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PasswordList;