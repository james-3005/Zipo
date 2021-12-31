const fs = require('fs');
const fileName = process.argv[2] || '';
const type = process.argv[3];

if (fileName) {
  if (fileName[0] <= 'Z' && fileName >= 'A') {
    const dir = `./${fileName}`;
    if (!fs.existsSync(dir)) {
      fs.writeFileSync(
        `src/scss/${fileName}.scss`,
        `@import 'app';
.container {
  
}`,
      );
      if (type) {
        fs.writeFileSync(
          `${fileName}.tsx`,
          `import React from 'react';
import { View } from 'react-native';
import styles from '../../scss/${fileName}.scss'
import { connect } from "react-redux";
import { reduxState } from "../../redux/reducer";
import { LIGHT_THEME, DARK_THEME } from "../../utilities/theme";

class ${fileName} extends React.Component<${fileName}Props, ${fileName}State> {
  constructor(props: ${fileName}Props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        
      </View>
    );
  }
}

function mapStateToProps(state: reduxState) {
  return {
    $store: state,
  };
}

export default connect(mapStateToProps)(${fileName});
export interface ${fileName}Props {
  $store: reduxState
}

interface ${fileName}State {

}`,
        );
      } else
        fs.writeFileSync(
          `${fileName}.tsx`,
          `import React from 'react';
import { View } from 'react-native';
import styles from '../../scss/${fileName}.scss'
        
export default class ${fileName} extends React.Component<${fileName}Props, ${fileName}State> {
  constructor(props: ${fileName}Props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        
      </View>
    );
  }
}

export interface ${fileName}Props {

}

interface ${fileName}State {

}`,
        );
    } else {
      console.log('Name exist');
    }
  } else {
    console.log('Capitalize first letter');
  }
}
