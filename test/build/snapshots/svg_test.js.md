# Snapshot report for `test/build/svg_test.js`

The actual snapshot is saved in `svg_test.js.snap`.

Generated by [AVA](https://ava.li).

## copies an SVG from source to target

> Snapshot 1

    [
      'tmp/tests/target/icon.svg',
    ]

> Snapshot 2

    {
      'tmp/tests/target/icon.svg': `<svg>␊
        <path />␊
      </svg>`,
    }

## imports an SVG into a component

> Snapshot 1

    [
      'tmp/tests/target/index.html',
    ]

> Snapshot 2

    {
      'tmp/tests/target/index.html': `<!DOCTYPE html>␊
      ␊
      <span><svg>␊
        <path />␊
      </svg></span>`,
    }
