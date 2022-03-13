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
          `import React, { FC, useState } from "react";
import { View } from "react-native";
import styles from "../../scss/${fileName}.scss";
import { useSelector } from "react-redux";
import { reduxState } from "../../redux/reducer";
const ${fileName}: FC = (props: ${fileName}Props) => {
  const [store] = useState<reduxState>(
    useSelector((state) => state) as reduxState
  );
  
  return (
    <View style={styles.container}>
      
    </View>
  );
};

export default ${fileName};

export interface ${fileName}Props {}

interface ${fileName}State {}`,
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
