import React, { useState, useEffect } from "react";
import { Button, Icon } from "@neos-project/react-ui-components";
import TextInput from "./Components/TextInput";
import RoundedBox from "./Components/RoundedBox";
import SpacingBox from "./Components/SpacingBox";
import { convertValue, limitToMinMax } from "./Helper";
import { neos } from "@neos-project/neos-ui-decorators";
import { useDebounce } from "use-debounce";
import * as stylex from "@stylexjs/stylex";
