/**
 * @author princemuel
 * @example
 * queryElement<HTMLButtonElement>('.tabBtn')
 * queryElement<HTMLButtonElement>('.tabBtn', false, form)
 * queryElement<HTMLButtonElement>('.tabBtn', true, document)
 * @returns T | T[]
 */

function queryElement<T extends HTMLElement>(
  selector: string,
  query?: 'single',
  scope?: ParentNode
): T;
function queryElement<T extends HTMLElement>(
  selector: string,
  query?: 'list',
  scope?: ParentNode
): T[];
function queryElement<T extends HTMLElement>(
  selector: string,
  query = 'single',
  scope?: ParentNode
): unknown {
  try {
    const node = scope || document;

    const message = `The element(s) with this selector "${selector}" do(es) not exist. Please check if your selector is correct`;

    if (query === 'list') {
      const elements = Array.from<T>(node.querySelectorAll(selector));
      if (elements.length < 1) throw new Error(message);
      return elements;
    }

    const element = node.querySelector<T>(selector);
    if (!element) throw new Error(message);
    return element;
  } catch (error) {
    throw error;
  }
}

export { queryElement };
