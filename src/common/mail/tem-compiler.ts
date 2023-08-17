import fs from "fs";
import path from "path";
import { get } from "lodash";
import inlineCss from "inline-css";
import { compile, type Options } from "ejs";

interface TemOptions {
  dir?: string;
  options?: Options;
  // for inline css
  inlineCssOptions?: inlineCss.Options;
  inlineCssEnabled?: boolean;
}

export async function compileTemplate(
  mail: any,
  callback: any,
  options: TemOptions = {
    inlineCssEnabled: true,
    inlineCssOptions: { url: " " },
  }
) {
  const ejsOptions = get(options, "options", {});
  // context and template from mail.data
  const { template, context } = mail.data;

  // base dir for template
  const templateBaseDir = get(options, "dir", "");
  // template ext
  const templateExt = path.extname(template) || ".ejs";
  // get template name
  let templateName = path.basename(template, path.extname(template));
  // check if template is absolute
  const templateDir = path.isAbsolute(template)
    ? path.dirname(template)
    : path.join(templateBaseDir, path.dirname(template));
  // template path
  const templatePath = path.join(templateDir, templateName + templateExt);
  // make template name
  templateName = path
    .relative(templateBaseDir, templatePath)
    .replace(templateExt, "");

  // finely read template file
  try {
    const template = fs.readFileSync(templatePath, "utf-8");
    // compile template
    const templateCompiled = compile(template, {
      ...ejsOptions,
      filename: templatePath,
    });
    // get html as a string
    const html = await templateCompiled(context);

    // add css in inline
    if (options.inlineCssEnabled) {
      mail.data.html = await inlineCss(html, options.inlineCssOptions).catch(
        callback
      );
      return callback();
    } else {
      mail.data.html = html;
      return callback();
    }
  } catch (err) {
    // if template is not found
    // return callback(new Error(`Template "${templateName}
    return callback(err);
  }
}
