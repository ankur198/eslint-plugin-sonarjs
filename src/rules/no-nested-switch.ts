/*
 * eslint-plugin-sonarjs
 * Copyright (C) 2018-2021 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
// https://sonarsource.github.io/rspec/#/rspec/S1821

import type { TSESTree, TSESLint } from '@typescript-eslint/experimental-utils';
import docsUrl from '../utils/docs-url';

const rule: TSESLint.RuleModule<string, string[]> = {
  meta: {
    messages: {
      removeNestedSwitch: 'Refactor the code to eliminate this nested "switch".',
    },
    schema: [],
    type: 'suggestion',
    docs: {
      description: '"switch" statements should not be nested',
      recommended: 'error',
      url: docsUrl(__filename),
    },
  },
  create(context) {
    return {
      'SwitchStatement SwitchStatement': (node: TSESTree.Node) => {
        const switchToken = context
          .getSourceCode()
          .getFirstToken(node, token => token.value === 'switch');
        context.report({
          messageId: 'removeNestedSwitch',
          loc: switchToken!.loc,
        });
      },
    };
  },
};

export = rule;
